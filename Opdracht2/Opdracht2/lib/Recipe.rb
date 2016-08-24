class Recipe 

	_name = '';
	_price = '';
	_ingredients = []

	def initialize(name, price, ingredients)
		_name = name
		_price = price
		_ingredients = ingredients
	end

	def getName
	 return _name
	end

	def getPrice() 
		return _price
	end

	def getIngredients() 
		return _ingredients
	end

	def addIngredient 
		if _ingredients.include? params[:ingredient]
			_ingredients.insert(params[:ingredient])
		end

	end


end