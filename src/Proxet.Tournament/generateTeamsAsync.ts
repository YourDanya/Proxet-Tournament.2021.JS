//asynchronous version works faster but requires adding await statement
//before calling generateTeams function in the test file

export interface Teams {
    team1: string[];
    team2: string[];
}

export const generateTeams =async(filePath:string):Promise<Teams> =>{

    const {
        BinarySearchTree
    } = require('@datastructures-js/binary-search-tree')

    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(filePath)
    });

    const users=new BinarySearchTree()
    let firstLine=true
    lineReader.on('line', (line:string) => {
        const stringArr= line.split(/\s+/)
        if(!firstLine){
            const key= -parseInt(stringArr[1], 10)
            const node= users.find(key)
            if(node){
                const elem= node.getValue()
                elem.push({name: stringArr[0], time: stringArr[1], type:stringArr[2]})
                users.insert(key, elem)
            } if(!node){
                users.insert(key, [{name: stringArr[0], time: stringArr[1], type: stringArr[2]}])
            }
        } else{
            firstLine=false
        }
    })

    const teamOne :string[]=[]
    const teamTwo :string[]=[]


    return new Promise((resolve, reject) => lineReader.on('close', ()=>{

        // users.traverseInOrder(node =>{
        //     const arr= node.getValue()
        //     console.log(arr)
        // })
        console.log('close')
        const find=(type:number, condition:boolean)=>{
            const length= type*3
            try{
                users.traverseInOrder((node:any) =>{
                    const arr= node.getValue()

                    for(let i=0; i<arr.length; i++){

                        if(condition){
                            if(arr[i].type===type.toString()){
                                teamOne.push(arr[i].name)
                            }

                            if(teamOne.length===length){
                                throw new Error(`finding 3 users with ${type} done`)
                            }
                        } else{
                            if(arr[i].type===type.toString() && !teamOne.includes(arr[i].name)){
                                teamTwo.push(arr[i].name)
                            }

                            if(teamTwo.length===length){
                                throw new Error(`finding 3 users with ${type} done`)
                            }
                        }
                    }
                })
            } catch(error: any){
                console.log(error.message)
            }
        }

        for(let i=1; i<=3 ; i++){
            find(i, true)
            find(i, false)
        }

        console.log(teamOne)
        console.log(teamTwo)
        console.log('end')

        resolve({
            team1: teamOne,
            team2: teamTwo
        })

    }))
}