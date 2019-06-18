const controller = {};

controller.list = (req, res) =>  {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM PELICULAS', (err, customers) => {
            if (err) {
                res.json(err);
            }
            
            res.render('customers', {
                results: customers
            });
        });
    });
};


controller.save = (req, res) =>  {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO PELICULAS set ?', [data], (err, customer) => {
      console.log(customer)
      res.redirect('/');
    });
  });
};


controller.edit = (req, res) => {
    const  {id}  = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM PELICULAS WHERE id_película = ?", [id], (err, rows) => {
        res.render('customer_edit', {
          results: rows[0]
        });
      });
    });
  };
  
  controller.update = (req, res) => {
    const {id} = req.params;
    //const newCustomer = req.body;
    req.getConnection((err, conn) => {  
    let sql = "UPDATE PELICULAS set nombre= '"+ req.body.nombre + "', descripcion= '" + req.body.descripcion + "', año= '" + req.body.año + "', categoria= '" + req.body.categoria + "' WHERE id_película = " + id;
    let query = conn.query(sql, (err, results) => {
      res.redirect('/');
    });
    });
  };
  
  controller.delete = (req, res) => {
   const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM PELICULAS WHERE id_película = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
  };
  

module.exports = controller;
