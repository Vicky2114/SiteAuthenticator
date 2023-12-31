const jwt=require('jsonwebtoken');
const User=require('../models/user');
const nodemailer=require('../config/nodemailer');
require('dotenv').config()
const JWT_SECRET=process.env.JWT;


module.exports.ren=function(req,res){
    console.log('done');
    return res.render('forget_password');
}


module.exports.forgetpass=async function(req,res){
     
    try{
        let user = await User.findOne({email: req.body.email});
        if (!user){
            return res.json(422, {
                message: "no user found is thier"
            });
        }

        const secret=JWT_SECRET+user.password;
        const payload={
            email:user.email,
            id:user.id
        }
        const token=jwt.sign(payload,secret,{expiresIn:'1000000000'})
       // jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '100000'})
        const link=`http://localhost:3000/users/reset-password/${user.id}/${token}`
        user.link=link
        const website=user.website;
         user.website=[
            ...website,
            {
            user: "DB Learner",
            text: "niceeee",
          }];

        console.log(user.link);
        user.save();
        let htmlstring=nodemailer.renderTemplate({user:user},'/email.ejs')
        console.log(link);
       //const link=`http://code-expert-djlq.onrender.com/forget-password/reset-password/${user.id}/${token}`
        //mail processs
        nodemailer.transporter.sendMail({
        from:'vr6994056@gmail.com',
        to:user.email,
        subject:"Forget Password",
        html:htmlstring
       })

        
        return res.redirect('/');
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
module.exports.resetpassword=async function(req,res){
    const{id,token}=req.params
    let user = await User.findById(id);
    //console.log(user.id);
     if(req.params.id!==user.id)
     {
        res.send('invalid id..')
        return
     }



     const secret=JWT_SECRET+user.password;
     try{

       const payload=jwt.verify(token,secret)
       res.render('reset_password',{email:user.email})

       
     }catch(error){
        console.log(error.message);
        res.send(error.message);

     }

}

module.exports.reset=async function(req,res){
    const{id,token}=req.params
    const{password,password2}=req.body
    let user = await User.findById(id);

     if(req.params.id!==user.id)
     {
        res.send('invalid id..')
        return
     }
     if(password!==password2)
     {
        console.log("not matched")
         return res.redirect('back')
     }
     const secret=JWT_SECRET+user.password;
     try{
       const payload=jwt.verify(token,secret)
       //validate password
     user.password=password2;
      console.log(user);
      user.save();
      req.flash('success', 'password reset');
      return res.redirect("http://localhost:3000/");
     }catch(error){
        console.log(error.message);
        res.send(error.message);

     }
    }
