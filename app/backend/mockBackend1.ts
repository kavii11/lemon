// mock backend placeholder
export const fakeAuth = () => {
 return { user: { id: "123", name: "User" } };
};

export const saveProject = (data:any)=>{
 localStorage.setItem("project",JSON.stringify(data));
};

export const loadProject = ()=>{
 const d = localStorage.getItem("project");
 return d?JSON.parse(d):null;
};
