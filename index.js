const express = require("express");
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
  {id: 1, name:'course1'}, 
  {id: 2, name:'course2'},
  {id: 3, name:'course3'}
];
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`"Listening on  port ${port} ...."`));

// Get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
// get specific course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('The course Id does not exist');

  res.send(courses);

});
// Create new course
app.post('/api/courses', (req, res) =>{
  const {error} = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message); 

app.get("/", (req, res) => {
  res.send("hello world !!");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) =>{
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    const validation = schema.validate(req.body);
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return; 
    }
    const course ={
        id: courses.length+1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(courses)
})

// Update
app.put('/api/courses/:id' , (req, res) => {

  // check wether course exist
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('The course Id doe not exist') ;
  // check if it is valid  
  const {error} = validateCourse(req.body);
   if(error) return res.status(400).send(error.details[0].message);
  //  then update course name
   course.name = req.body.name;
   res.send(courses);

});

// Delete
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('The course Id does not exist');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});
function validateCourse(course){
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
   return schema.validate(course); 
}
  
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) res.status(404).send('The course Id doe not exist')
  res.send(course);

});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`"Listening on  port ${port} ...."`));


