import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function LoginPage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);


    async function login(e){
        e.preventDefault();
        try{
            const response = await fetch("https://weblogs-3hui.onrender.com/login",{
                method: "POST",
                body: JSON.stringify({username,password}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
            //console.log("login response from backend" , response);

            if(response.status===200){
                response.json().then((userInfo) => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                    alert("login successful");
                    localStorage.setItem("token", userInfo.token);
                })
                
            }
            else{
                alert("Wrong Credentials");
            }
        }
        catch(err){
          alert("Something went wrong, Try again later")
        }
    }
    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        

        <div className="rounded-lg border bg-card text-card-foreground shadow-xl mx-auto max-w-sm" data-v0-t="card">
        <div className="flex flex-col p-6 space-y-1">
        <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
        <p className="text-sm text-muted-foreground">Enter your username below to login to your account</p>
        </div>
        <div className="p-6">
        <div className="space-y-4">
        <div className="space-y-2">
        <div
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
        >
          Username
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="email"
          placeholder="enter username here"
          required=""
          type="text"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="password"
          >
            Password
          </div>
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="password"
          required=""
          type="password"
          placeholder="enter your password here"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={login}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[100%] bg-[black] text-[white]"
        type="submit"
      >
        Login
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full bg-[#c90e0e] text-white">
        Login with Google
      </button>
      
    </div>
    <div className="mt-4 text-center text-sm">
      Don't have an account?
      <Link className="underline" to={'/register'}>
        Register
      </Link>
    </div>
  </div>
</div>
    )
}