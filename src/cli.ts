#!/usr/bin/env node
'use strict'
import info from './index.js'
import * as packageJson from "../package.json"

interface PackageJson {
  description: string
  version: string
}

async function help (packageInfo: PackageJson): Promise<void> {
  console.log(packageInfo.description)
  console.log('')
  console.log('Usage')
  console.log('  $ package-info <package-name>')
  console.log('')
  console.log('Example')
  console.log('  $ package-info pageres')
}

export default async function cli (
  processArgv: string[] = process.argv
): Promise<void> {
  const argv: string[] = processArgv.slice(2)
  if ((argv.length === 0) || argv.includes('--help')) {
    help(packageJson)
    return
  }

  if (
    processArgv.includes('-v') ||
    processArgv.includes('--version')
  ) {
    console.log(packageJson.version)
    return
  }

  const input = argv[0]
  info(input)
    .then(version => console.log(version))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

cli()
