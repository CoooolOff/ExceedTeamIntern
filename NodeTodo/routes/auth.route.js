const {Router}                  = require('express')
const router                    = Router()
const User                      = require('../models/User')
const Guser                      = require('../models/Guser')
const {check, validationResult} = require('express-validator')
const bcrypt                    = require('bcryptjs')
const jToken                    = require('jsonwebtoken')

router.post('/registration',
        check('email' , 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').isLength({min: 6})
    ,
    async (req , res) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                 errors: errors.array(),
                message: 'Не корректные данные'
            })
        }

        const {email, password} = req.body

        const isUsed = await User.findOne({email})

        if(isUsed){
            return res.status(300).json({message:'Данный пользовать занят'})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const user = new User({
            email,password:hashedPassword
        })

        await user.save()
        res.status(201).json({message: 'Пользователь создан'})
    }catch (err){
        console.log(err)
    }
})

router.post('/login',
    check('email' , 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').exists(),
    async (req , res) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Не корректные данные'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Такого пользователя нет'})
        }

        const isEqual = await bcrypt.compare(password, user.password)

        if(!isEqual){
            return res.status(400).json({message: 'Не верный пароль'})
        }

        const jSycret = 'dsasfwasfasfascasvfasf'

        const token = jToken.sign(
            {userId: user.id},
            jSycret,
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

    }catch (err){
        console.log(err)
    }
})
router.post('/gLogin',
    async (req , res) =>{
        try{
            const {gmail} = req.body
            const user = await Guser.findOne({email:gmail.Qt})
            console.log(user)
            if(user===null){
                const user = new Guser({
                    email:gmail.Qt
                })
                await user.save()
            }


            const jSycret = 'dsasfwasfasfascasvfasf'

            const token = jToken.sign(
                {userId: user.id},
                jSycret,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        }catch (err){
            console.log(err)
        }
    })

module.exports = router