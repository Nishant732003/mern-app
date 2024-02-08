const validate = (schema) =>async(req,res,next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.issues[0].message;
        // console.log(message);
        // console.log(extra);
        // res.status(400).json({ msg: message });
        const error = {
            status, message,
            extraDetails
        }
        // const message = {};
        
        // error.issues.forEach((issue) => {
           
        //     const field = issue.path[0];
        //     const errmessage = issue.message;
        //     if (!message[field]) {
        //       message[field] = [];
        //     }
        //     message[field].push(errmessage);
        // })
        console.log(error);
        next(error);
    }
}
module.exports = validate;