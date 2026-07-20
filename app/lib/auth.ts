export async function loginUser(data: {email:string, password:string}){
    const res = await fetch("/api/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
      const result = await res.json()
        if (!res.ok) {
           throw new Error(result.error)
        }
        return result;
}

export async function registerUser(data: {name:string, email: string, password:string}){
      console.log("Before fetch")
      const res = await fetch("/api/register", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
      console.log("After fetch")
            const result = await res.json()
      console.log("After json")
            if (!res.ok) {
            throw new Error(result.error)
        }
        return result;
        
}