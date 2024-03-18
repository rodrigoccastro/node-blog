class UserDto {
    constructor(id, name, email, age, createDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.createDate = createDate;
    }
  }
  
  module.exports = UserDto;