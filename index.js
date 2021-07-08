const express = require("express");
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
  {id: 1, name:'course1'}, 
  {id: 2, name:'course2'},
  {id: 3, name:'course3'}
];

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

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) res.status(404).send('The course Id doe not exist')
  res.send(course);

});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`"Listening on  port ${port} ...."`));

// app.post();
// app.put();
// app.delete();
