const { response } = require("express");
const Event = require("../models/Event")

// {
//     ok:true,
//     msg:"obtener eventos"
// }

const getEventos = async(req, res = response) => {

  const eventos = await Event.find()
                            .populate("user","name")
                            

  res.status(201).json({
    ok: "true",
    eventos
  });
};
const crearEvento = async(req, res = response) => {

    const evento = new Event(req.body)
    try {

        evento.user = req.uid

        const eventGuardado = await evento.save()

        res.json({
          ok:true,
          evento:eventGuardado
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
          ok:false,
          msg:"Hable con el administrador"
        })
    }
  
};
const actualizarEvento = async(req, res = response) => {
  const  eventId  = req.params.id;
  const uid = req.uid

  try {
    const evento = await Event.findById(eventId)
    if(!evento){
     return res.status(404).json({
        ok:false,
        msg:"Evento no existe con ese id"
      })
    }

    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok:false,
        msg:"No tiene privilegio de editar este evento"
      })
    }

    const nuevoEvento = {
      ...req.body,
      user:uid
    }

    const eventoActualizado = await Event.findByIdAndUpdate(eventId, nuevoEvento,{new:true})

    res.json({
      ok:true,
      evento:eventoActualizado
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok:false,
      msg:"Hable con el administrador"
    })
  }

 
};

const eliminarEvento = async(req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Event.findById(eventId)
    if(!evento){
     return res.status(404).json({
        ok:false,
        msg:"Evento no existe con ese id"
      })
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    await Event.findByIdAndDelete(eventId)

    res.status(201).json({
      ok: "true"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
  
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
