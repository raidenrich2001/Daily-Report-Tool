var express = require('express');
var router = express.Router();
var UserSchema = require('./Schema/UserSchema');
var ReportSchema = require('./Schema/ReportSchema')

router.post('/signup', (req, res) => {

    UserSchema.findOne({ empid: req.body.empid }, (err, employees) => {
        if (employees) {
            res.json({ message: "User Already Exist" })
        }
        else {
            const employeedata = new UserSchema({
                name: req.body.name,
                empid: req.body.empid,
                password: req.body.password,
                department: req.body.department
            });
            employeedata.save();
            res.json({ message: "Added Successfully" })
        }
    })
})

router.post('/login', (req, res) => {
    UserSchema.findOne({ empid: req.body.empid }, (err, employee) => {
        if (employee) {
            if (req.body.password === employee.password) {

                res.json({ message: "Successfully Login", user: employee })
            }
            else {
                res.json({ message: "Wrong Credentials" })
            }
        }
        else {
            res.json({ message: "User Not Found" })
        }

    })

})



router.post('/task', (req, res) => {
    ReportSchema.findOne({ date: req.body.date, empid: req.body.empid }, (err, reports) => {
        if (reports) {
            res.json({ message: "Already Done" })
        }
        else {
            const task = JSON.parse(req.body.task);
            const data = new ReportSchema({
                empid: req.body.empid,
                name: req.body.name,
                date: req.body.date,
                department: req.body.department,
                task: task,
            })

            data.save();
            res.json({ message: "Successfull", report: data });
        }

    })

}
)
router.get('/singleuser/:empid', async (req, res) => {
   try{
    const user = await UserSchema.find({ empid: req.params.empid })
    res.json({user:user})
   }
   catch(e){
    res.json(e)
   }
})


router.get('/singleuser/:empid/:id', async (req, res) => {
   try{
    const user = await UserSchema.find({ empid: req.params.empid })
    res.json({user:user})
   }
   catch(e){
    res.json(e)
   }
})

router.get('/singleuserusingid/:id', async (req, res) => {
   try{
    const user = await UserSchema.findById(req.params.id)
    res.json({user:user})
   }
   catch(e){
    res.json(e)
   }
})


router.get('/getonereport/:empid', async (req, res) => {
   try{
    const user = await ReportSchema.find({ empid: req.params.empid });
    res.json({user:user})
   }
   catch(e){
    res.json(e)
   }
}) 


router.delete('/getonereport&delete/:id', async (req, res) => {
    try{
     await ReportSchema.findByIdAndDelete(req.params.id);
     res.json("Deleted Successfully")
    }
    catch(e){
     res.json(e)
    }
 }) 


router.get('/getonereportid/:id', async (req, res) => {
    try{
     const user = await ReportSchema.findById(req.params.id);
     res.json({user:user})
    }
    catch(e){
     res.json(e)
    }
 }) 

router.get('/getdepartmentuser/:id/:department', async (req, res) => {
  try{
    const user = await UserSchema.find({ department: req.params.department})
    res.json({user:user})
  }
  catch(e){
    res.json(e)
  }
})

router.get('/getdepartmentusers/:department', async (req, res) => {
    try{
        const user = await UserSchema.find({ department: req.params.department})
        res.json({user:user})
      }
      catch(e){
        res.json(e)
      }
})
router.get('/getdepartmentreport/:department', async (req, res) => {
    try{
        const user = await ReportSchema.find({ department: req.params.department})
        res.json({user:user})
      }
      catch(e){
        res.json(e)
      }
})



router.get('/getdepartmentreport/:id/:department', async (req, res) => {
    try{
        const user = await ReportSchema.find({ department: req.params.department})
        res.json({user:user})
      }
      catch(e){
        res.json(e)
      }
}) 

router.get('/getalluserwithreport', async (req, res) => {
    const data = await UserSchema.aggregate(
        [{ $lookup: { from: "reportschemas", localField: "empid", foreignField: "empid", as: "reports" } }]
    );
    res.json(data)
})



router.post('/updatereport/:id', async (req, res) => {
   try{
    const getreport = await ReportSchema.findByIdAndUpdate(req.params.id);
    const task = JSON.parse(req.body.task);
        getreport.task = task
    await getreport.save();
    res.json('Updated Successfully')
   }
   catch(e){
    res.json(e)
   }
})
module.exports = router

