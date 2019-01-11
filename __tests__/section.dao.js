const SectionDao = require('../db/section/dao')

describe('section.dao : single usage', async ()=>{
  const timestamp = (new Date()).getTime()

  it('create', async ()=>{
    const res = await SectionDao.create({
      cityCode: `cityCode-${timestamp}`,
      townCode: `townCode-${timestamp}`,
      sectCode: `sectCode-${timestamp}`,
      landBuildMax: timestamp,
      project: `project-${timestamp}`,
    })

    expect(res.cityCode).toBe(`cityCode-${timestamp}`)
    expect(res.townCode).toBe(`townCode-${timestamp}`)
    expect(res.sectCode).toBe(`sectCode-${timestamp}`)
    expect(res.landBuildMax).toBe(timestamp)
    expect(res.project).toBe(`project-${timestamp}`)
    expect(typeof res.updatedAt).toBe('object') //date object
    expect(typeof res.createdAt).toBe('object') //date object
  })

  it('update & findOne', async ()=>{
    const cityCode = `cityCode-${timestamp}`
    const sectCode = `foo-${timestamp}`
    await SectionDao.update({sectCode}, {cityCode})
    const res =  await SectionDao.findOne({sectCode})
    expect(res.cityCode).toBe(cityCode)
  })

  it('desctory', async ()=>{
    const cityCode = `cityCode-${timestamp}`
    const res1 =  await SectionDao.findOne({cityCode})
    expect(res1.cityCode).toBe(cityCode)

    await SectionDao.destroy({cityCode})
    const res2 =  await SectionDao.findOne({cityCode})
    expect(res2).toBe(null)
  })
})


describe('section.dao : multi usage', async ()=>{
  const timestamp = (new Date()).getTime()

  it('create 2 section', async ()=>{
    const common = 987
    await SectionDao.create({
      cityCode: `cityCode-1-${timestamp}`,
      townCode: `townCode-1-${timestamp}`,
      sectCode: `sectCode-1-${timestamp}`,
      project: `project-1-${timestamp}`,
      landBuildMax: common,
    })

    await SectionDao.create({
      cityCode: `cityCode-2-${timestamp}`,
      townCode: `townCode-2-${timestamp}`,
      sectCode: `sectCode-2-${timestamp}`,
      project: `project-2-${timestamp}`,
      landBuildMax: common,
    })

    const res0 = await SectionDao.findAndCountAll({landBuildMax: common})

    expect(res0.count).toBe(2)
    expect(res0.data[0].cityCode).toBe(`cityCode-1-${timestamp}`)
    expect(res0.data[1].cityCode).toBe(`cityCode-2-${timestamp}`)

    await SectionDao.destroy({landBuildMax: common})
    const res1 = await SectionDao.findAndCountAll({landBuildMax: common})
    expect(res1.count).toBe(1)

    await SectionDao.destroy({landBuildMax: common})
    const res2 = await SectionDao.findAndCountAll({landBuildMax: common})
    expect(res2.count).toBe(0)
  })
})