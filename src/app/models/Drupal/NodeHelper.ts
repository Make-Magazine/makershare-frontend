export class NodeHelper{
  constructor(){}

  public static RemoveFileTypeFromBase64(filecontent:string):string{
    let re = /^data:image\/[^;]+;base64,/g;
    let newcontent = re[Symbol.replace](filecontent, '');  
    return newcontent;
  }

  public static AddFileTypeToBase64(filecontent:string,filemime:string):string{
    return "data:"+filemime+";base64,"+filecontent;
  }

  /**
   * a very usefull method to check the variable if its empty or not
   * this function works with all type of variables "string, number, array and object"
   * @param variable 
   */
  public static isEmpty(variable:any):boolean {
    return Object.keys(variable).every(function(key) {
      return variable[key]===''||variable[key]===null;
    });
  }

  public static ConvertToBase64(file,FileEntityObject){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      FileEntityObject.filename = file.name;
      FileEntityObject.file = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
   }

  public static GetUserIDFromFieldReferenceAutoComplete(UsernameAndId:string){
    return UsernameAndId.match(/\(([^)]+)\)/)[1];
  }

  public static IsEmail(email:string):boolean {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}