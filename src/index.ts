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

    let name 		= dataParsed.name;
    let version 	= dataParsed[ 'dist-tags' ].latest;
    let description = dataParsed.description;
    let license 	= dataParsed.license;
    let homepage 	= '';
    let authorName = '';

    if(dataParsed.homepage !== undefined){
        homepage 	= dataParsed.homepage;
    }

    if(dataParsed.author !== undefined){
        authorName = dataParsed.author.name;
    }
    else{
        if(dataParsed.maintainers !== undefined){
            for (let i in dataParsed.maintainers) {
                const maintainer = dataParsed.maintainers[i];
                if(authorName === ''){
                    authorName = maintainer.name;
                }
                else{
                    authorName = authorName + ', ' + maintainer.name;
                }
            }
        }
    }

    return {
        name,
        version,
        description,
        license,
        homepage,
        author: authorName
    };
}

export default async function info(name: string) {
    return fetchData(registryUrl() + name.toLowerCase());
}
