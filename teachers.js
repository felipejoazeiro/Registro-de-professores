const fs = require('fs')
const data = require('./data.json')
const { age , date } = require('./utils')

//Mostrar
exports.show=(req,res)=>{
    const {id} = req.params
    const foundTeacher = data.teachers.find((teacher)=>{
        return teacher.id == id
    })
    if(!foundTeacher) return res.send('Professor não encontrado')

    const teacher = {
        ...foundTeacher,
        area: foundTeacher.area.split(","),
        age: age(foundTeacher.birth),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render('teachers/show', {teacher:teacher})
}

//Criar
exports.post=(req,res)=>{
    const keys = Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all fields!')
        }
    }
    let{avatar_url, name, birth, schooling, type, area}=req.body

    birth = Date.parse(birth);
    const id = Number(data.teachers.length + 1);
    const created_at = Date.now()

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        schooling,
        type,
        area,
        created_at
    })
    
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(){
        if(err) return res.send('Write file error')

        return res.redirect('teachers')
    })
}

//editar
exports.edit= (req,res)=>{
    const {id} = req.params
    const foundTeacher = data.teachers.find((teacher)=>{
        return teacher.id == id
    })
    if(!foundTeacher) return res.send('Professor não encontrado')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }
    return res.render('teachers/edit', {teachers: teacher})
}

exports.put=(req,res)=>{
    const {id} = req.body
    let index = 0
    const foundTeacher = data.teachers.find((teacher,foundIndex)=>{
        if(teacher.id==id){
            index=foundIndex
            return true
        }
    })
    if(!foundTeacher) return res.send('Erro ao atualizar os dados')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }
    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data,null,4),(err)=>{
        if(err) return res.send("Write error")
        
        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete=(req,res)=>{
    const {id} = req.body

    const filtrarTeacher = data.teachers.filter((teacher)=>{
        return teacher.id != id
    })

    data.teachers = filtrarTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 4),(err)=>{
        if(err) return res.send('Erro ao deletar')

        return res.redirect('/teachers')
    })
}