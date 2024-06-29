// The Magical Sorting Hat: Imagine you are creating  a magical sorting hat for a wizard school. Implement a JavaScript function that takes an array of student names and assigns them to one of the four houses 
// (Gryffindor (length less than 6)), 
// (Hufflepuff(length less than 8)) , 
// (RavenClaw(length less than 12)), 
// (Slytherin(Length greater than or equal to 12)) 
// based on the length of their names. 


let students = ["Harry Potter","Hermione Granger","Ron Weasley","Albus Dumbledore","Severus Snape","Minerva McGonagall","Rubeus Hagrid","Draco Malfoy","Luna","Neville","Ginny","Fred","George", "Cho","Cedric","Aria","Ethan","Oliver","Lydia","Felix","Isabella Smith","Mason","Zara","Eleanor","Lucas","Ava Johnson","Benjamin","Sophia Williams","Leo","Emma Brown","Max","Charlotte Davis","Elijah","Amelia Wilson","Jack","Evelyn Anderson","Logan","Harper Martinez","Caleb","Abigail Taylor","Luke","Ella Thomas","Owen","Mia Roberts","Evan",
];



let Gryffindor = [];

let Hufflepuff = [];

let RavenClaw = [];

let Slytherin= [];

for (const student of students) {
    if(student.length < 6){
        Gryffindor.push(student)
    }
    else if(student.length < 8 && student.length >= 6){
        Hufflepuff.push(student)
    }
    else if(student.length < 12 && student.length >= 8){
        RavenClaw.push(student)
    }
    else (student.length >= 12)
    {Slytherin.push(student)}
    

}

console.log(Gryffindor)
console.log(Hufflepuff)
console.log(RavenClaw)
console.log(Slytherin)