const landBuildRecord = require('../db/landBuildRecord/dao')

describe('building.dao : single usage', async ()=>{
  let buildingId = ''

  beforeAll(async ()=>{
    const buildingDao = require('../db/building/dao')
    const res = await buildingDao.create({
      cityCode: `cityCode-${timestamp}`,
      townCode: `townCode-${timestamp}`,
      sectCode: `sectCode-${timestamp}`,
      landBuildMax: timestamp,
      project: `project-${timestamp}`,
    })
    buildingId = res.id
  })

  const timestamp = (new Date()).getTime()

  const data = `data-${timestamp}`
  const newData = `new-${data}`

  it('create', async ()=>{
    const res = await landBuildRecord.create({
      landBuild: `landBuild-${timestamp}`,
      data,
      buildingId
    })

    expect(res.landBuild).toBe(`landBuild-${timestamp}`)
    expect(res.data).toBe(data)
    expect(res.buildingId).toBe(buildingId)
    expect(typeof res.updatedAt).toBe('object') //date object
    expect(typeof res.createdAt).toBe('object') //date object
  })

  it('update & findOne', async ()=>{
    await landBuildRecord.update( {data: newData }, {data})
    const res =  await landBuildRecord.findOne({data: newData})
    expect(res.data).toBe(newData)
  })

  it('desctory', async ()=>{
    const res1 =  await landBuildRecord.findOne({data: newData})
    expect(res1.data).toBe(newData)

    await landBuildRecord.destroy({data: newData})
    const res2 =  await landBuildRecord.findOne({data: newData})
    expect(res2).toBe(null)
  })
})


describe('building.dao : multi usage', async ()=>{
  const timestamp = (new Date()).getTime()

  it('create 2 building', async ()=>{
    const common = `common-${timestamp}`
    await landBuildRecord.create({
      landBuild: common,
    })

    await landBuildRecord.create({
      landBuild: common,
    })

    const res0 = await landBuildRecord.findAndCountAll({landBuild: common})
    expect(res0.count).toBe(2)

    await landBuildRecord.destroy({landBuild: common})
    const res1 = await landBuildRecord.findAndCountAll({landBuild: common})
    expect(res1.count).toBe(1)

    await landBuildRecord.destroy({landBuild: common})
    const res2 = await landBuildRecord.findAndCountAll({landBuild: common})
    expect(res2.count).toBe(0)
  })
})