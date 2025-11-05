const fs = require('fs')
const path = require('path')

// Check if essential files exist
const essentialFiles = [
  'package.json',
  'server.js',
  'render.yaml',
  'next.config.js'
]

console.log('Verifying Render.com deployment setup...\n')

let allFilesExist = true

for (const file of essentialFiles) {
  const filePath = path.join(__dirname, file)
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} exists`)
  } else {
    console.log(`✗ ${file} is missing`)
    allFilesExist = false
  }
}

console.log('\n' + (allFilesExist ? 
  '✓ All essential files are present for Render.com deployment' : 
  '✗ Some essential files are missing'))