
;(async () => {
    try {
        await User.sync({ 
            alter: true,
            force: false
        });

        const userfindAll = await User.findAll();
        console.log(userfindAll);

        
        const userfindByPk = await User.findByPk(5);


        const userfindAllWhere = await User.findAll({ 

            where: {
                city: 'Москва',
                gender: 'male'
            }
        });
        console.log(userfindAllWhere);


        const userCreate = await User.create({ 
            first_name: "Jane", 
            last_name: "Doe",
            email: 'sdfghjkl@fghjd.ru',
            password: 'sdfghjkl'

        });
        console.log(userCreate);

        const userCreateDel = await User.create({ 
            first_name: "Del", 
            last_name: "Del",
            email: 'del@del.ru',
            password: 'del'

        });
        console.log(userCreate2);



        const userdestroy = await User.destroy({ 
            
            where: {
                first_name: "Del"
            }
        

        });
        console.log(userdestroy);

        const userupdate = await User.update({email: 'janedoe@gmail.com'}, { 
           
          where: {
            first_name: "Del"
          }
            

        });
        console.log(userupdate);
    }
    catch (error) {
        console.error(error);
    }
})();