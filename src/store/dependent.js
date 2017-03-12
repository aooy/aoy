export function dependent(cid, sname){
	let i = this.dependManage[cid];
	if(i && i.length>0){
		i.push(sname);
	}else{
		this.dependManage[cid] = [sname];
	}
}