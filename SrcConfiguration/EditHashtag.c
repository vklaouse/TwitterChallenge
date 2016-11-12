# include <stdio.h>
# include <stdlib.h>
# include <unistd.h>
# include <string.h>
# include <sys/uio.h>
# include <sys/types.h>
# include <fcntl.h>
#include "libft.h"
 
int main(int ac, char **av)
{
    if (ac > 1)
    {
        char **tab;
        char *line;
        int i = 0;
        int fd = open("server.js", O_RDONLY);
        tab = (char **)malloc(sizeof(char *) * 98);
        while (get_next_line(fd, &line) == 1)
        {
            tab[i] = (char *)malloc(sizeof(char) * ft_strlen(line) + 1);
            tab[i] = line;
            i++;
        }
        i = 1;
        while (i < 98)
        {
            ft_putstr(tab[i]);
            ft_putchar('\n');
            i++;
        }
        close(fd);
        //write(1, "Coucou", 1000);
        //remove("EditHastag.php");
    }
    else
        write(1, "Error\n", 6);
    return (0);
}