"use strict";

import got from 'got';
import registryUrl from 'registry-url';

type DistTags = {
    latest: string
}

type Author = {
    name: string
}

type PackageData = {
    name: string
    'dist-tags': DistTags
    description: string
    license: string
    homepage?: string
    author?: Author
    maintainers: Author[]
}

type Package = {
    name: string
    version: string
    description: string
    license: string
    homepage: string
    author: string
}

const fetchData = async (request: string): Promise<Package> => {
	const dataParsed: PackageData = await got(request).json();

	const name = dataParsed.name;
	const version = dataParsed["dist-tags"].latest;
	const description = dataParsed.description;
	const license = dataParsed.license;
	const homepage = dataParsed.homepage || '';
	const author =
		dataParsed.author?.name ||
		dataParsed.maintainers?.map(({ name }) => name).join(', ') ||
		'';

	return {
		name,
		version,
		description,
		license,
		homepage,
		author,
	};
};

export default async function info(name: string) {
	return fetchData(registryUrl() + name.toLowerCase());
}
