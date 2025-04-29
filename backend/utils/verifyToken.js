import jwt from "jsonwebtoken";

 export const verifyToken = (req, res, next) => {
    const token  = req.cookies.accessToken
    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authenticated" });
    }//if token exist then verify it 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is not valid" });
        }
        req.user = user; // Attach the user information to the request object
        next(); // Call the next middleware or route handler
    });
   }

   export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if(req.user.id === req.params.id || req.user.role ==='admin'){
        next()
        } else{
        return res.status(401).json({success:false, message:"You are not authorized" })
        }
        })
   }
   export const verifyAdmin  = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if( req.user.role ==='admin'){
        next()
        } else{
        return res.status(401).json({success:false, message:"You are not authorize" })
        }
        })
   }