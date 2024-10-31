const zod = require('zod')

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().email(),
    password: zod.string()
})

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

module.exports = {
    signupSchema,
    signinSchema,
    updateSchema
}