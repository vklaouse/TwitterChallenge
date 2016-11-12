/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Libft.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: vklaouse <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/11/24 16:07:10 by vklaouse          #+#    #+#             */
/*   Updated: 2016/04/24 07:05:47 by vklaouse         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef LIBFT_H
# define LIBFT_H

# define MAX_FD 256
# define BUFF_SIZE 1000
# include <stdlib.h>
# include <sys/types.h>
# include <sys/uio.h>
# include <unistd.h>
# include <string.h>
# include <stdarg.h>

/*
** Libft
*/

void				*ft_memset(void *s, int c, size_t n);
void				ft_bzero(void *s, size_t n);
void				*ft_memcpy(void *dest, const void *src, size_t n);
void				*ft_memccpy(void *dest, const void *src, int c, size_t n);
void				*ft_memmove(void *dest, const void *src, size_t n);
void				*ft_memchr(const void *s, int c, size_t n);
int					ft_memcmp(const void *s1, const void *s2, size_t n);
size_t				ft_strlen (const char *s);
char				*ft_strdup(const char *s);
char				*ft_strcpy(char *dest, const char *src);
char				*ft_strncpy(char *dest, const char *src, size_t n);
char				*ft_strcat(char *dest, const char *src);
char				*ft_strncat(char *dest, const char *src, size_t n);
size_t				ft_strlcat(char *dst, const char *src, size_t size);
char				*ft_strchr(const char *s, int c);
char				*ft_strrchr(const char *s, int c);
char				*ft_strstr(const char *s1, const char *s2);
char				*ft_strnstr(const char *s1, const char *s2, size_t n);
int					ft_strcmp (const char *s1, const char *s2);
int					ft_strncmp (const char *s1, const char *s2, size_t n);
int					ft_atoi(const char *nptr);
int					ft_isalpha(int c);
int					ft_isdigit(int c);
int					ft_isalnum(int c);
int					ft_isascii(int c);
int					ft_isprint(int c);
int					ft_toupper (int c);
int					ft_tolower (int c);
void				*ft_memalloc(size_t size);
void				ft_memdel(void **ap);
char				*ft_strnew(size_t size);
void				ft_strdel(char **as);
void				ft_strclr(char *s);
void				ft_striter(char *s, void (*f)(char*));
void				ft_striteri(char *s, void (*f)(unsigned int, char*));
char				*ft_strmap(char const *s, char (*f)(char));
char				*ft_strmapi(char const *s, char (*f)(unsigned int, char));
int					ft_strequ(char const *s1, char const *s2);
int					ft_strnequ(char const *s1, char const *s2, size_t n);
char				*ft_strsub(char const *s, unsigned int start, size_t len);
char				*ft_strjoin(char const *s1, char const *s2);
char				*ft_strtrim(char const *s);
char				**ft_strsplit(char const *s, char c);
char				*ft_itoa(int n);
void				ft_putchar(char c);
void				ft_putstr(char const *s);
void				ft_putendl(char const *s);
void				ft_putnbr(int n);
void				ft_putchar_fd(char c, int fd);
void				ft_putstr_fd(char const *s, int fd);
void				ft_putendl_fd(char const *s, int fd);
void				ft_putnbr_fd(int n, int fd);
int					ft_abs(int n);
char				*ft_freejoin(char *s1, char *s2);
void				*ft_realloc(void *ptr, size_t size, size_t oldsize);

typedef struct		s_list
{
	void			*content;
	size_t			content_size;
	struct s_list	*next;
}					t_list;

t_list				*ft_lstnew(void const *content, size_t content_size);
void				ft_lstdelone(t_list **alst, void (*del)(void*, size_t));
void				ft_lstdel(t_list **alst, void (*del)(void*, size_t));
void				ft_lstadd(t_list **alst, t_list *new);
void				ft_lstiter(t_list *lst, void (*f)(t_list *elem));
t_list				*ft_lstmap(t_list *lst, t_list *(*f)(t_list *elem));
int					ft_isblank(int c);
int					ft_islower(int c);
int					ft_isupper(int c);
int					ft_ispunct(int c);
int					ft_isgraph(int c);

/*
** GNL
*/

int					get_next_line(int const fd, char **line);

/*
** Ft_printf
*/

typedef struct		s_arg
{
	va_list			ap;
	int				i;
	int				fail;
	int				diese;
	int				moins;
	int				plus;
	int				space;
	int				zero;
	int				width;
	int				precision;
	int				hh;
	int				h;
	int				l;
	int				ll;
	int				j;
	int				z;
	int				ret;
	int				punct;
	int				size;
}					t_arg;

int					ft_printf(char *format, ...);
void				flag_diese(char *format, t_arg *arg);
void				flag_moins(char *format, t_arg *arg);
void				flag_plus(char *format, t_arg *arg);
void				flag_space(char *format, t_arg *arg);
void				flag_zero(char *format, t_arg *arg);
void				flag_width(char *format, t_arg *arg);
void				flag_precision(char *format, t_arg *arg);
void				flag_length(char *format, t_arg *arg);
void				ft_conv(char *format, t_arg *arg);
void				conv_d(char *format, t_arg *arg);
void				conv_c(t_arg *arg, char *format);
void				conv_s(t_arg *arg);
void				conv_strange(t_arg *arg);
void				conv_u(t_arg *arg, char *format);
void				conv_2x(t_arg *arg, char *format);
char				*ft_itoa_base_unsigned(unsigned long long value, int base);
void				conv_o(t_arg *arg, char *format);
void				ft_put_zero(int k, t_arg *arg);
void				ft_put_space(int k, t_arg *arg);
void				ft_putnbr_u(unsigned long long value);
int					ft_putnstr(char*s, t_arg *arg, int i);
void				conv_p(t_arg *arg);
char				*ft_putstrl(char *s);
char				*ft_itoa_base_long(long long value, int base);
void				ft_put_mystere(char c, int i);
void				wrong_conv(char *format, t_arg *arg);
void				conv_bigc(t_arg *arg);
char				**mask_unicode(char *wc);
void				ft_putwchar(char **bin);
void				conv_ws(t_arg *arg, char *format);
char				*stockbis(char **bin, unsigned int size);

/*
** Vector
*/

# define VECTOR_INIT_CAPACITY 8
# define VECTOR_GROWTH_FACTOR 2

typedef struct		s_vector
{
	void			**data;
	size_t			max;
	size_t			total;
}					t_vector;

void				*ft_vector_init(t_vector *v, size_t size);
void				*ft_vector_add(t_vector *v, void *e);
void				*ft_vector_set(t_vector *v, size_t i, void *e);
void				*ft_vector_get(t_vector *v, size_t i);
void				*ft_vector_delat(t_vector *v, size_t i);
void				*ft_vector_resize(t_vector *v);
void				ft_vector_destroy(t_vector *v);
void				*ft_vector_insert(t_vector *v, size_t i, void *e);
void				ft_vector_clear(t_vector *v);
void				ft_vector_print(t_vector *v, void (*print)(void*));

#endif
