'use strict'

import registryUrl from 'registry-url'
import { request } from 'undici'

interface DistTags {
  latest: string
}

interface Author {
  name: string
}

interface PackageData {
  name: string
  'dist-tags': DistTags
  description: string
  license: string
  homepage?: string
  author?: Author
  maintainers: Author[]
}

interface Package {
  name: string
  version: string
  description: string
  license: string
  homepage: string
  author: string
}

type PackageResult = {
  success: true
  data: Package
} | {
  success: false
  error: string
}

const fetchData = async (url: string): Promise<PackageResult> => {
  let name = ''
  let version = ''
  let description = ''
  let license = ''
  let homepage = ''
  let author = ''

  try {
    const {
      statusCode,
      headers,
      trailers,
      body
    } = await request(url)

    const dataParsed: PackageData = await body.json()

    name = dataParsed.name

    version = dataParsed['dist-tags'].latest
    description = dataParsed.description
    license = dataParsed.license
    homepage = dataParsed.homepage || ''
    author =
		dataParsed.author?.name ||
		dataParsed.maintainers?.map(({ name }) => name).join(', ') ||
		''

    return {
        success: true,
        data: {
            name,
            version,
            description,
            license,
            homepage,
            author
        }
    }
  } catch (error) {
      return {
        success: false,
        error: 'Error on retrieve package information'
      }
  }
}

export default async function info (name: string) {
  	const result = await fetchData(registryUrl() + name.toLowerCase())
	if (result.success) {
		return result.data
	}

	return result.error
}
