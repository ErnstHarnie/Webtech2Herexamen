class Recipe

	@name
	@price
	@Ingredients = []

	def initialize(name, price, Ingredients)
		@name = name
		@price = price
		@Ingredients = Ingredients
	end

	def getName
	 return @name
	end

	def getPrice() 
		return @price
	end

	def getIngredients() 
		return @Ingredients
	end

	def addIngredient 
		if @Ingredients.include? params[:ingredient]
			@Ingredients.insert(params[:ingredient])
		end

	end


end