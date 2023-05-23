const knex = require('../database/knex')

class MoviesController{
    
    async Index(request, response){
        const {title, tags}= request.query
        const user_id = request.user.id

        let movies

        if(tags){
            const tagsFilted = tags.split(',').map(tag => tag.trim())
            movies = await knex('movies').select([
                'movies.id',
                'movies.title',
                'movies.user_id',
            ])
            .where('movies.user_id',user_id)
            .whereLike('movies.title', `%${title}%`)
            .whereIn('tags.name',tagsFilted)
            .innerJoin('tags', 'tags.movies_id', 'movies.id')
            .orderBy('movies.title')
            
        }else{
            movies = await knex('movies').where({user_id})
            .whereLike('movies.title', `%${title}%`)
            .orderBy('title')
    }
    
        const tagsUser = await knex('tags').where({user_id})
        const MoviesWhithTags = movies.map(movie => {
            let category= []
            const categoryFilter = tagsUser.filter(tag => {
                if(tag.movies_id === movie.id) category.push(tag)
            })
            return{
                ...movie,
                tag: category
            }
        })
        
        return response.json(MoviesWhithTags)
    }

    async Show(request, response){
        const { id } = request.params

        const movie = await knex('movies').where({id}).first()
        const tags = await knex('tags').where({id}).orderBy('name')

      
        return response.json({
            ...movie,
            tags
        })
    
    }
   
    async Create(request, response){
        const { title, description, tags , rating } = request.body
        const user_id = request.user.id
        console.log(title, description, tags )
        const [movies_id] = await knex('movies').insert({
            title,
            description,
            rating,
            user_id
        })

       
        const tagsMovies = tags.map(name =>{ 
            return { 
                name,
                movies_id,
                user_id
            }
        })

        await knex('tags').insert(tagsMovies)

        return response.json()
    }

    async Delete(request, response){
        const { id } = request.params

        await knex('movies').where({id}).delete()
        
        return response.json()
    }

}

module.exports = MoviesController