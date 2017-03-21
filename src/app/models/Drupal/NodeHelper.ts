export class NodeHelper{
  constructor(){}

  public static RemoveFileTypeFromBase64(filecontent:string):string{
    let re = /^data:image\/[^;]+;base64,/g;
    let newcontent = re[Symbol.replace](filecontent, '');  
    return newcontent;
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
}