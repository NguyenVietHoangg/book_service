import fs from 'fs'

const count = 10
export const make = async () => {
  try {
    console.log('================== BEGIN - BUILD '+count+' MODEL CHAPTER ====================\n')
    const pathDatabase = `${__dirname}/../../database/models`
    const contentModelChapter = `${__dirname}/chapterModel.js`
    let contentChapter = fs.readFileSync(`${contentModelChapter}`, 'utf8')
    for (let i=1; i <= count; i++) {
      console.log('=== '+ i)
      contentChapter = contentChapter.replace(/chapter_table/g, 'chapter'+i)
      fs.writeFile(pathDatabase+'/chapter'+i+'.js', contentChapter, function(err) {
        console.log('error', err)
      })
    }
    console.log('================== END - BUILD '+count+' MODEL CHAPTER ====================\n')
  } catch(err) {
    console.error('Catch error make model all : ' + count, err)
  }
}
 make()