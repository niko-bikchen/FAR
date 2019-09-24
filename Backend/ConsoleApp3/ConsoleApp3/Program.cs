using System;
using System.Collections.Generic;


namespace ConsoleApp3
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<char, int> numbers = new Dictionary<char, int>();
            numbers.Add('I',1);
            numbers.Add('V',5);
            numbers.Add('X',10);
            numbers.Add('L', 50);
            numbers.Add('C', 100);
            numbers.Add('D',500);
            numbers.Add('M',1000);
            //
            Console.WriteLine("Enter a rome number:");
            string number = Console.ReadLine();
            //
            int resultNum = 0;
            for(int i=0;i<number.Length;i++)
            {
                int newNum = 0;
                try
                {
                    newNum = numbers[number[i]];
                }
                catch (KeyNotFoundException)
                {
                    Console.WriteLine("This number does not exist");
                    Environment.Exit(0);
                }
                int counter = 1;

                int sample = newNum;
                int currentNum = newNum;
                if (i+counter<number.Length)
                {
                    newNum = 0;
                    while (i + counter < number.Length && sample == currentNum)
                    {
                        newNum += sample;
                        try
                        {
                            sample = numbers[number[i + counter++]];
                        }
                        catch (KeyNotFoundException)
                        {
                            Console.WriteLine("This number does not exist");
                            Environment.Exit(0);
                        }
                    }
                    --i;

                }
                i += counter - 1;
                if (i<=number.Length-2 && sample>currentNum)
                {
                    newNum *= -1;
                }
                resultNum += newNum;
            }
            Console.Write(resultNum+"\n");


        }
    }
}
