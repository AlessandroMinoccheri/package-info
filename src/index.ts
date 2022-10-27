'use strict'

import { errorMonitor } from 'events'
import got, { RequestError } from 'got'
import { exit } from 'process'
import registryUrl from 'registry-url'

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

const fetchData = async (request: string): Promise<Package> => {
	let name = ''
  let version = ''
  let description = ''
  let license = ''
  let homepage = ''
  let author = ''
  try {
    const dataParsed: PackageData = await got(request).json()
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
      name,
      version,
      description,
      license,
      homepage,
      author
    }
  } catch (error) {
    throw (new Error('Error on retrieve the package'))
  }
}

export default async function info (name: string) {
  return await fetchData(registryUrl() + name.toLowerCase())
}
