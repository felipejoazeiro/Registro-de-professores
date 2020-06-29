const fs = require('fs')
const data = require('../data.json')
const { age , date } = require('../utils');


exports.table=(req,res)=>{
    return res.render('students/student', {students: data.students})
}
//Mostrar
exports.show=(req,res)=>{
    const {id} = req.params
    const foundstudent = data.students.find((student)=>{
        return student.id == id
    })
    if(!foundstudent) return res.send('Professor não encontrado')

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).birthDay,
    }

    return res.render('students/show', {student:student})
}

//Criar
exports.post=(req,res)=>{
    const keys = Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all fields!')
        }
    }
    
    let id = 1
    const lastStudent = data.students[data.students.length-1]
    if(lastStudent){
        id=lastStudent + 1
    }
    
    birth = Date.parse(req.body.birth);

    data.students.push({
        id,
        ...req.body,
        birth
    })
    
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(){
        if(err) return res.send('Write file error')

        return res.redirect('students')
    })
}

//editar
exports.edit= (req,res)=>{
    const {id} = req.params
    const foundstudent = data.students.find((student)=>{
        return student.id == id
    })
    if(!foundstudent) return res.send('Professor não encontrado')

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).iso
    }
    return res.render('students/edit', {students: student})
}

exports.put=(req,res)=>{
    const {id} = req.body
    let index = 0
    const foundstudent = data.students.find((student,foundIndex)=>{
        if(student.id==id){
            index=foundIndex
            return true
        }
    })
    if(!foundstudent) return res.send('Erro ao atualizar os dados')

    const student = {
        ...foundstudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }
    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data,null,4),(err)=>{
        if(err) return res.send("Write error")
        
        return res.redirect(`/students/${id}`)
    })
}

exports.delete=(req,res)=>{
    const {id} = req.body

    const filtrarstudent = data.students.filter((student)=>{
        return student.id != id
    })

    data.students = filtrarstudent

    fs.writeFile("data.json", JSON.stringify(data, null, 4),(err)=>{
        if(err) return res.send('Erro ao deletar')

        return res.redirect('/students')
    })
}