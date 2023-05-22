const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const Category = await Category.findAll({
      include: [
        { model: Product },
        { model: Tag}
      ]
    });
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const category = await Category.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ] 
    });
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    } 
});

router.post('/', aysnc (req, res) => {
  // create a new category
  await Category.create(req.body);
  res.status(200).json(category);
} catch (err) {
  res.status(500).json(err);
} 
});

router.put('/:id', aysnc (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', aysnc (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
      res.status(400).json(err);
    }
  }
});

module.exports = router;
