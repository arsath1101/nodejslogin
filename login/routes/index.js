const { query } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Express',session:req.session });
});
router.post('/login',function(request,response,next)
{
  var user_enail_address=request.body.user_email_address;

  var user_password=request.body.user_password;
  if(user_enail_address && user_password)
  {
    query='SELECT*FROM USER WHERE USER_EMAIL="${user_email_address}';

    database.query(query,function(err,data)
    {
      if (data.length>0)
      {
        for(var count =0;count<data.length;count++)
        {
          if (data[count].user_password==user_password)
          {
            request.session.user_id= data [count].user_id;
            response.redirect("/");

          }
          else
          {
            response.send('wrong password');

          }

        }

      }
      else
      {
        response.send('incorrect email addres');

      }
    })

  }
  else
  {
    response.send('please enter email address and password details');
    response.end();
  }


});

router.get('/logout',function(request,response,next){
  request.session.destroy();
  response.redirect("/");
})

module.exports = router;
