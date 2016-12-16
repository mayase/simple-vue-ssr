export default function(remote){
    this.getList = ()=>{
        return remote.get('http://0.0.0.0:8081/json');
    }
}