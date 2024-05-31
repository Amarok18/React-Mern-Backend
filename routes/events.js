const { Router } = require("express")
const {check} = require("express-validator")
const {validarCampos} = require("../middlewares/validar-campos")
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events")
const { validateJWT } = require("../middlewares/validate-jwt")
const { isDate } = require("../helpers/isDate")
const router = Router()
//Todas las peticiones debajo pasar por este middleware
router.use(validateJWT)
// Obtener eventos
router.get("/", getEventos)

router.post(
    "/", 
    [
        check("title","El titulo es obligatorio").not().isEmpty(),
        check("start","Fecha de inicio es obligatoria").custom( isDate ),
        check("end","Fecha de finalizacion es obligatoria").custom( isDate ),
        validarCampos
    ],
crearEvento
);

router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

router.delete("/:id",  eliminarEvento);

module.exports = router
