const mongoose = require('mongoose')

// ------------Use Express to Build a REST API--------------
const express = require('express')
const app = express()

const noteSchema = new mongoose.Schema({
    tittle:{
      type:String,
      required:true,
      unique:true
    },
    body:{
      type: String,
      minlength:10
    }
})

const Note = mongoose.model('note',noteSchema);

//const  morgan = require('dev');
const { urlencoded,json} = require('body-parser')

//app.use(morgan('dev'))
app.use(urlencoded({extended:true}))
app.use(json())


app.get('/note',async (req,res)=>{
    const notes = await Note.find({})
    .lean()
    .exec()
    res.status(200).json(notes);
})

app.post('/note', async (req,res)=>{
    const noteTobeCreated = req.body;
    const note = await Note.create(noteTobeCreated);
    res.status(201).json(note.toJSON())
})

// ------------- pagination ------------------------------
app.get('/note',async (req,res)=>{
    //way 1
    const notes = await Note.find({}
        .sort()
        .skip(10)
        .limit(10)
        .exec())
    res.status(200).json(notes);
    //way 2 -- cursor based
})







//----------------------------------------------------------

const connect = () => {
   return mongoose.connect('mongodb://localhost:27017/whatever',{
   })
}


const student = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    list:[{type:String,required:true}],
    lastName: String,
    school:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    },
})

const school = new mongoose.Schema({
    district:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'district'
    },
    name: String,
    openSince:Number,
    students:Number,
    isGreat:Boolean,
    staff:[]
})

//compund index
school.index({
    district:1,
    name: 1
},{unique:true})

//virtuals
school.virtual('staffCount').get(function(){
    console.log('Virtulas')
    return this.staff.length;
})

// middleware Hooks(pre,post)
school.pre('save',function(){
    console.log('before save')
    
})
school.post('save',function(doc,next){
    console.log('after  save',doc)
    next()
})





const School = mongoose.model('school',school);
const Student = mongoose.model('student',student)

connect().then( async connection=>{

    app.listen(5000);

    // const schoolConfig = {
    //     name:'advs nadabi2',
    //     openSince:2000,
    //     students:1000,
    //     isGreat:true,
    //     staff:['a','b','c']
    // }
    const school2 = {
        name:'advs nadabi2',
        openSince:2009,
        students:2000,
        isGreat:true,
        staff:['b','e','f']
    }
    // const school = await School.findOneAndUpdate(
    //     {name:'adv nadabi'},{name:'adv nadabi'},
    //     {upsert:true,new:true}
    // ).exec()

    const schools = await School.create({
        name:'advs nadabi5',
        openSince:2009,
        students:2000,
        isGreat:true,
        staff:['b','e','f']
    })

    // const match = await School.findOne({openSince:2009}).exec()
    // console.log(match)
    // console.log(match.staffCount)

    // const student = await Student.create({firstName:'satish',lastName:'kumar',school:school._id});

    // const match = await Student.findById(student.id).populate('school').exec()
    //  console.log(student);
    //  console.log(match)
})
.catch(e => console.error(e))




