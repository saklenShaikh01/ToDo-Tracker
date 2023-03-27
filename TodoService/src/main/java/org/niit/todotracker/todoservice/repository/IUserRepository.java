package org.niit.todotracker.todoservice.repository;

import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import javax.mail.search.SearchTerm;
import java.util.List;
import java.util.Set;

@Repository
public interface IUserRepository extends MongoRepository<User, String> {
    @Query("{categoryName:{$in:[?0]}}")
    public List<User> findAllByCategoryName(String categoryName);
}
