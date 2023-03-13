const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function get_products(req, res) {
    db.all('SELECT * FROM products', [], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if (!data || data.length === 0) {
            res.status(404).send('No products found');
        } else {
            res.send(data);
        }
    })  
}

function get_product_id(req, res) {
    const id = req.params.id;
    db.get('SELECT * FROM products WHERE id=?', [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if (!data) {
            res.status(404).send('Product not found');
        } else {
            res.send(data);
        }
    });
}


function post_product(req, res){
    const category = req.body.category;
    const image = req.body.image;
    const name = req.body.name;
    const price = req.body. price;
    const description = req.body.description;
    // Validate the input data
    if (!category || !image || !name || !price || !description) {
        return res.status(400).send('Invalid input data');
    } else {
        if (typeof category !== 'string') {
            return res.status(400).send('Category must be a text');
        }

        if (typeof image !== 'string') {
            return res.status(400).send('Image must be a text');
        }

        if (typeof name !== 'string') {
            return res.status(400).send('Name must be a text');
        }

        if (typeof price !== 'number') {
            return res.status(400).send('Price must be a number');
        }

        if (typeof description !== 'string') {
            return res.status(400).send('Description must be a text');
        }
    }
    
    db.run('INSERT INTO products (category, image, name, price, description) VALUES (?,?,?,?,?)',[category, image, name, price, description])
    res.send('Produc has been add') 
        
}


function delete_product_id(req, res) {
    const id = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
        return;
      }
  
      if (!data) {
        res.status(404).send(`Toy with ID ${id} not found`);
        return;
      }
  
      db.run('DELETE FROM products WHERE id = ?', [id], err => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal server error');
          return;
        }
        res.send(`Toy with ID ${id} has been deleted`);
      });
    });
  }

function put_product_id(req, res){
    const id = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, data) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal server error');
          return;
        }
    
        if (!data) {
          res.status(404).send(`Toy with ID ${id} not found`);
          return;
        }
        const category = req.body.category;
        const image = req.body.image;
        const name = req.body.name;
        const price = req.body. price;
        const description = req.body.description;
        //Validate the update data
        if (!category || !image || !name || !price || !description) {
            return res.status(400).send('Invalid input data');
        } else {
            if (typeof category !== 'string') {
                return res.status(400).send('Category must be a text');
            }

            if (typeof image !== 'string') {
                return res.status(400).send('Image must be a text');
            }

            if (typeof name !== 'string') {
                return res.status(400).send('Name must be a text');
            }

            if (typeof price !== 'number') {
                return res.status(400).send('Price must be a number');
            }

            if (typeof description !== 'string') {
                return res.status(400).send('Description must be a text');
            }
        }
        db.run('UPDATE products SET category=?, image=?, name=?, price=?, description=? WHERE id=?',[category, image, name, price, description, id], (err, data) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
                return;
            }
            res.send(`Toy with ID ${id} has been update`)
        })
    })
  };

  function patch_protuct_id(req, res){
    const id = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, data) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal server error');
          return;
        }
    
        if (!data) {
          res.status(404).send(`Toy with ID ${id} not found`);
          return;
        }
        const category = req.body.category;
        const image = req.body.image;
        const name = req.body.name;
        const price = req.body. price;
        const description = req.body.description;

        let setValues = [];
    
        if (category) {
            setValues.push(`category = '${category}'`);
            if (typeof category !== 'string') {
                return res.status(400).send('Category must be a text');
            }
        }
    
        if (image) {
            setValues.push(`image = '${image}'`);
            if (typeof image !== 'string') {
                return res.status(400).send('Image must be a text');
            }
        }

        if (name) {
            setValues.push(`name = '${name}'`);
            if (typeof name !== 'string') {
                return res.status(400).send('Name must be a text');
            }
        }

        if (price) {
            setValues.push(`price = '${price}'`);
            if (typeof price !== 'number') {
                return res.status(400).send('Price must be a number');
            }
        }
        
        if (description) {
            setValues.push(`description = '${description}'`);
            if (typeof description !== 'string') {
                return res.status(400).send('Description must be a text');
            }
        }
    
        if (setValues.length === 0) {
        res.status(400).send('No fields to update');
        return;
        }
    
        db.run(`UPDATE products SET ${setValues.join(', ')} WHERE id = ${id}`, (err) => {
        if (err) {
            res.status(500).send('Error updating toy');
        } else {
            res.send(`Toy with ID ${id} has been update, where ${setValues.join(', ')}`);
        }
        })
    })
  }

module.exports = {
    get_products,
    get_product_id,
    post_product,
    delete_product_id,
    put_product_id,
    patch_protuct_id
}