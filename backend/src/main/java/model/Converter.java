package model;
//Class was developed by Vladislav Haponenko

import org.springframework.data.annotation.Id;

import java.util.Hashtable;

public class Converter {
    @Id
    private String id;

    private String date;
    private String email;
    private String system_in;
    private String system_out;
    private String text_in;
    private String text_out;

    public Converter(){}


    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getSystem_in() {
        return system_in;
    }

    public String getSystem_out() {
        return system_out;
    }

    public String getText_in() {
        return text_in;
    }

    public String getText_out() {
        return text_out;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSystem_in(String system_in) {
        this.system_in = system_in;
    }

    public void setSystem_out(String system_out) {
        this.system_out = system_out;
    }

    public void setText_in(String text_in) {
        this.text_in = text_in;
    }

    public void setText_out(String text_out) {
        this.text_out = text_out;
    }

    @Override
    public String toString() {
        return String.format(
                "Converter[id=%s, date='%s', system_in='%s', system_out='%s', text_in='%s', text_out='%s']",
                id, date, system_in,system_out,text_in,text_out);
    }

    //method for translating roman to arabic
    public static int RomeToArab(String number){
        Hashtable<Character, Integer> numbers = new Hashtable<Character, Integer>();
        numbers.put('I', 1);
        numbers.put('V', 5);
        numbers.put('X', 10);
        numbers.put('L', 50);
        numbers.put('C', 100);
        numbers.put('D', 500);
        numbers.put('M', 1000);
        int resultNum = 0;
        for (int i = 0; i < number.length(); i++)
        {
            int newNum = numbers.get(number.charAt(i));

            int counter = 1;

            int sample = newNum;
            int currentNum = newNum;
            if (i + counter < number.length())
            {
                newNum = 0;
                while (i + counter < number.length() && sample == currentNum)
                {
                    newNum += sample;
                    sample = numbers.get(number.charAt(i + counter++));
                }
                --i;
            }
            i += counter - 1;
            if (i <= number.length() - 2 && sample > currentNum)
            {
                newNum *= -1;
            }
            resultNum += newNum;
        }
        return resultNum;
    }


    //methonds needed to translate arabic numbers to roman
    public static String ArabToRome(int number)
    {
        Hashtable< Integer,Character> numbers = new Hashtable< Integer,Character>();
        numbers.put(1, 'I');
        numbers.put(5, 'V');
        numbers.put(10, 'X');
        numbers.put(50, 'L');
        numbers.put(100, 'C');
        numbers.put(500, 'D');
        numbers.put(1000, 'M');

        String thousands= ThousandsNum(number, numbers);
        String other= DozensNum(number, numbers,1)
                     + TensNum(number, numbers,1)
                     + OnesNum(number, numbers,1);
        if(thousands.length()==0){
            return other;
        }else{
            return thousands.length()+"xM"+other;
        }
    }

   private static String ThousandsNum(int num, Hashtable< Integer,Character> dict)
    {
        if (num < 1000)
        {
            return "";
        }
        int counter = 0;
        while (num - (++counter) * 1000 > 1000) ;
        String answer= new String(""+dict.get(1000));
        if(counter-1==0)
        {
            return answer;
        }
        for(int i=0;i<counter-1;i++){
            answer=new String(answer+dict.get(1000));
        }
        return answer;
    }
    private static String DozensNum(int num, Hashtable< Integer,Character> dict,int range)
    {
        if (num < 100*range)
        {
            return "";
        }
        int nNum = num %( 1000*range);
        int counter = 0;
        while (nNum - (++counter) * 100*range > 100*range) ;
        if (counter == 4)
        {
            return dict.get(100).toString()+dict.get(500).toString()+"";
        }
        else if (counter == 9)
        {
            return dict.get(100).toString()+dict.get(1000).toString()+"";
        }
        else if (counter < 4)
        {

            if(nNum<100*range){
                return "";
            }
            String answer= new String(""+dict.get(100));
            for(int i=0;i<counter-1;i++){
                answer=new String(answer+dict.get(100));
            }
            return answer;
        }
        else
        {
            String s = new String(""+dict.get(500));
            if(counter-4<=0){
                return s;
            }
            String substr=new String(""+dict.get(100));
            for(int i=0;i<counter-6;i++){
                substr=new String(substr+dict.get(100));
            }
            s = new String(s+substr);
            return s;
        }
    }
    private static String TensNum(int num, Hashtable< Integer,Character> dict,int range)
    {
        if (num < 10*range)
        {
            return "";
        }
        int nNum = num % (100*range);
        int counter = 0;
        while (nNum - (++counter) * 10*range > 10*range) ;
        if (counter == 4)
        {
            return dict.get(10).toString()+dict.get(50).toString()+"";
        }
        else if (counter == 9)
        {
            return dict.get(10).toString()+dict.get(100).toString()+"";
        }
        else if (counter < 4)
        {

            if(nNum<10*range){
                return "";
            }
            String answer= new String(""+dict.get(10));
            for(int i=0;i<counter-1;i++){
                answer=new String(answer+dict.get(10));
            }
            return answer;
        }
        else
        {
            String s = new String(""+dict.get(50));
            if(counter-4<=0){
                return s;
            }
            String substr=new String(""+dict.get(10));
            for(int i=0;i<counter-6;i++){
                substr=new String(substr+dict.get(10));
            }
            s = new String(s+substr);

            return s;
        }
    }
    private static String OnesNum(int num, Hashtable< Integer,Character> dict,int range)
    {
        if (num < 1*range)
        {
            return "";
        }
        int nNum = num % (10*range);
        if (nNum == 4)
        {
            return dict.get(1).toString()+dict.get(5).toString()+"";
        }
        else if (nNum == 9)
        {
            return dict.get(1).toString()+dict.get(10).toString()+"";
        }
        else if (nNum < 4)
        {
            if(nNum==0){
                return "";
            }
            String answer= new String(""+dict.get(1));

            for(int i=0;i<nNum-1;i++){
                answer=new String(answer+dict.get(1));
            }
            return answer;
        }
        else
        {
            String s = new String(""+dict.get(5));
            if(nNum-4<=0){
                return s;
            }
            String substr=new String(""+dict.get(1));
            for(int i=0;i<nNum-6;i++){
                substr=new String(substr+dict.get(1));
            }
            s = new String(s+substr);

            return s;
        }

    }


}
