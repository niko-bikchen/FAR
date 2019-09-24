using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp4
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<int, char> numbers = new Dictionary<int, char>();
            numbers.Add(1, 'I');
            numbers.Add(5, 'V');
            numbers.Add(10, 'X');
            numbers.Add(50, 'L');
            numbers.Add(100, 'C');
            numbers.Add(500, 'D');
            numbers.Add(1000, 'M');
            //
            Console.WriteLine("Enter an arabic number:");
            int number = Int32.Parse(Console.ReadLine());
            Console.WriteLine(thousandsNum(number,numbers)+dozensNum(number,numbers)+tensNum(number,numbers)+onesNum(number,numbers));
            
        }

        public static string thousandsNum(int num, Dictionary<int,char> dict)
        {
            if (num < 1000)
            {
                return "";
            }
            int counter = 0;
            while (num - (++counter) * 1000 > 1000) ;
            return new string((dict[1000]),counter);
        }
        public static string dozensNum(int num, Dictionary<int, char> dict)
        {
            if (num < 100)
            {
                return "";
            }
            int nNum = num % 1000;
            int counter = 0;
            while (nNum - (++counter) * 100 > 100) ;
            if (counter == 4)
            {
                return "CD";
            }
            else if (counter == 9)
            {
                return "CM";
            }
            else if (counter < 4)
            {
                return new string(dict[100], counter);
            }
            else
            {
                string s = new string(dict[500], 1);
                s += (new string(dict[100], counter - 5));
                return s;
            }
        }
        public static string tensNum(int num, Dictionary<int, char> dict)
        {
            if (num < 100)
            {
                return "";
            }
            int nNum = num % 100;
            int counter = 0;
            while (nNum - (++counter) * 10 > 10) ;
            if (counter == 4)
            {
                return "XL";
            }
            else if (counter == 9)
            {
                return "XC";
            }
            else if (counter < 4)
            {
                return new string(dict[10], counter);
            }
            else
            {
                string s = new string(dict[50], 1);
                s += (new string(dict[10], counter - 5));
                return s;
            }
        }
        public static string onesNum(int num, Dictionary<int, char> dict)
        {
            int nNum = num % 10;
            if (nNum == 4)
            {
                return "IV";
            }else if(nNum==9)
            {
                return "IX";
            }else if(nNum<4)
            {
                return new string(dict[1],nNum);
            }else
            {
                string s =new string(dict[5],1);
                s += (new string(dict[1], nNum - 5));
                return s;
            }
            
        }
    }
}
