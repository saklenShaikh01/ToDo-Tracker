package org.niit.todotracker.todoservice;

import org.niit.todotracker.todoservice.filter.FilterJwtToken;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableFeignClients
@EnableEurekaClient
public class TodoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoServiceApplication.class, args);
	}

	@Bean
	FilterRegistrationBean filterToken(){
		FilterRegistrationBean frb = new FilterRegistrationBean<>();
		frb.setFilter(new FilterJwtToken());
		frb.addUrlPatterns("/api/userTodo/addCategory/*","/api/userTodo/jj/*");
		return frb;
	}
//	@Bean
//	public FilterRegistrationBean filterRegistrationBean(){
//		final CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.addAllowedOrigin("http://localhost:63624");
//		config.addAllowedHeader("*");
//		config.addAllowedMethod("*");
//		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**",config);
//		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//		return bean;
//	}

}
