#!/usr/bin/env node

const { connectToDB } = require('./base')

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
const main = async () => {
  if (!(await connectToDB())) {
    process.exit(1)
  }

  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
