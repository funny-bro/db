const authDao = require('../db/auth/dao')

describe('auth.dao : single usage', async ()=>{
  const timestamp = (new Date()).getTime()

  it('create', async ()=>{
    const res = await authDao.create({
      username: `username-${timestamp}`,
      cookieValue: `cookieValue-${timestamp}`,
      ensid: `ensid-${timestamp}`,
      enuid: `enuid-${timestamp}`,
    })

    expect(res.username).toBe(`username-${timestamp}`)
    expect(res.cookieValue).toBe(`cookieValue-${timestamp}`)
    expect(res.ensid).toBe(`ensid-${timestamp}`)
    expect(res.enuid).toBe(`enuid-${timestamp}`)
    expect(typeof res.updatedAt).toBe('object') //date object
    expect(typeof res.createdAt).toBe('object') //date object
  })

  it('update & findOne', async ()=>{
    const username = `username-${timestamp}`
    const ensid = `foo-${timestamp}`
    await authDao.update({ensid}, {username})
    const res =  await authDao.findOne({ensid})
    expect(res.username).toBe(username)
  })

  it('desctory', async ()=>{
    const username = `username-${timestamp}`
    const res1 =  await authDao.findOne({username})
    expect(res1.username).toBe(username)

    await authDao.destroy({username})
    const res2 =  await authDao.findOne({username})
    expect(res2).toBe(null)
  })
})


describe('auth.dao : multi usage', async ()=>{
  const timestamp = (new Date()).getTime()

  it('create 2 auth', async ()=>{
    const common = `common-${timestamp}`
    await authDao.create({
      username: `username-1-${timestamp}`,
      cookieValue: `cookieValue-1-${timestamp}`,
      ensid: `ensid-1-${timestamp}`,
      enuid: common,
    })

    await authDao.create({
      username: `username-2-${timestamp}`,
      cookieValue: `cookieValue-2-${timestamp}`,
      ensid: `ensid-2-${timestamp}`,
      enuid: common,
    })

    const res0 = await authDao.findAndCountAll({enuid: common})
    expect(res0.count).toBe(2)
    expect(res0.data[0].username).toBe(`username-1-${timestamp}`)
    expect(res0.data[1].username).toBe(`username-2-${timestamp}`)

    await authDao.destroy({enuid: common})
    const res1 = await authDao.findAndCountAll({enuid: common})
    expect(res1.count).toBe(1)

    await authDao.destroy({enuid: common})
    const res2 = await authDao.findAndCountAll({enuid: common})
    expect(res2.count).toBe(0)
  })
})