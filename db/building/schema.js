
const Auth = {
  type: 'object',
  properties: {
    cityCode: { 
     type: 'string',
     required: true,
     minLength: 1
    },
    townCode: { 
     type: 'string',
     required: true,
     minLength: 1
    },
    sectCode: { 
     type: 'string',
     required: true,
     minLength: 1
    },
    landBuild: { 
     type: 'string',
     required: true,
     minLength: 1
    },
    project: { 
     type: 'string',
     required: true,
     minLength: 1
    },
  }
}

module.exports = Auth