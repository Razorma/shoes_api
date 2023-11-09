import jwt from "jsonwebtoken"

export default function authenticateToken(){
    function authenticateCustomerToken(req,res,next){
        const authHeaders =  req.cookies['customer-token'];
        
        
    
        const token = authHeaders 
    
        if(token===null){
            res.json({
				status: "error",
				error: "User not logged in"
			});
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE ,(error,user)=>{
            if(error){
                res.json({
                    status: "error",
                    error: "User not logged in"
                });
            }else{
                req.user=user
                next()
            }
        })
    
    }
    function authenticateAdminToken(req,res,next){
        const authHeaders =  req.cookies['admin-token'];
        
        
    
        const token = authHeaders 
    
        if(token===null){
            res.json({
				status: "error",
				error: "User not logged in"
			});
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE ,(error,user)=>{
            if(error){
                res.json({
                    status: "error",
                    error: "User not logged in"
                });
            }else{
                req.user=user
                next()
            }
        })
    
    }

    return {
        authenticateAdminToken,
        authenticateCustomerToken
    }

}
 
 