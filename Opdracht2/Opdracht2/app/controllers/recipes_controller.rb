class RecipesController < ApplicationController
require 'recipe' #in lib folder

	def index
		@Recipe = Recipe.new("Sukiyaki", 35, ['beef', 'tofu', 'negi', 'shungiku', 'shiitake', 'shiratake', 'noodles'])
	end

end
