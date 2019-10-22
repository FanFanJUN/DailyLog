
### JS字符串截取函数slice(),substring(),substr()的区别
<h3 id="一substring">一、substring()</h3>
<p><code>substring()</code>方法返回一个索引和另一个索引之间的字符串，语法如下：</p>
<blockquote>
<p>str.substring(indexStart, [indexEnd])</p>
</blockquote>
<p>下面有六点需要注意：</p>
<blockquote>
<ul>
<li>substring()从提取的字符indexStart可达但不包括 indexEnd</li>
<li>如果indexStart 等于indexEnd，substring()返回一个空字符串。</li>
<li>如果indexEnd省略，则将substring()字符提取到字符串的末尾。</li>
<li>如果任一参数小于0或是NaN，它被视为为0。</li>
<li>如果任何一个参数都大于stringName.length，则被视为是stringName.length。</li>
<li>如果indexStart大于indexEnd，那么效果substring()就好像这两个论点被交换了一样； 例如，str.substring(1, 0) == str.substring(0, 1)</li>
</ul>
</blockquote>
<p>以下是一些示例代码：</p>
<pre class="javascript"><code>var str = &#39;abcdefghij&#39;;
console.log(&#39;(1, 2): &#39;   + str.substring(1, 2));   // &#39;(1, 2): b&#39;
console.log(&#39;(1, 1): &#39;   + str.substring(1, 1));   // &#39;(1, 1): &#39;
console.log(&#39;(-3, 2): &#39;  + str.substring(-3, 2));  // &#39;(-3, 2): ab&#39;
console.log(&#39;(-3): &#39;     + str.substring(-3));     // &#39;(-3): abcdefghij&#39;
console.log(&#39;(1): &#39;      + str.substring(1));      // &#39;(1): bcdefghij&#39;
console.log(&#39;(-20, 2): &#39; + str.substring(-20, 2)); // &#39;(-20, 2): ab&#39;
console.log(&#39;(2, 20): &#39;  + str.substring(2, 20));  // &#39;(2, 20): cdefghij&#39;
console.log(&#39;(20, 2): &#39;  + str.substring(20, 2));  // &#39;(20, 2): cdefghij&#39;</code></pre>
<h3 id="二substr">二、substr()</h3>
<p><code>substr()</code>方法返回从指定位置开始的字符串中指定字符数的字符，语法如下：</p>
<blockquote>
<p>str.substr(start, [length])</p>
</blockquote>
<p>下面有四点需要注意：</p>
<blockquote>
<ul>
<li><code>substr()</code>会从<code>start</code>获取长度为<code>length</code>字符（如果截取到字符串的末尾，则会停止截取）。</li>
<li>如果<code>start</code>是正的并且大于或等于字符串的长度，则<code>substr()</code>返回一个空字符串。</li>
<li>若<code>start</code>为负数,则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）。</li>
<li>如果<code>length</code>为0或为负数，<code>substr()</code>返回一个空字符串。如果<code>length</code>省略，则将<code>substr()</code>字符提取到字符串的末尾。</li>
</ul>
</blockquote>
<p>以下是一些示例代码：</p>
<pre class="javascript"><code>var str = &#39;abcdefghij&#39;;
console.log(&#39;(1, 2): &#39;   + str.substr(1, 2));   // &#39;(1, 2): bc&#39;
console.log(&#39;(-3, 2): &#39;  + str.substr(-3, 2));  // &#39;(-3, 2): hi&#39;
console.log(&#39;(-3): &#39;     + str.substr(-3));     // &#39;(-3): hij&#39;
console.log(&#39;(1): &#39;      + str.substr(1));      // &#39;(1): bcdefghij&#39;
console.log(&#39;(-20, 2): &#39; + str.substr(-20, 2)); // &#39;(-20, 2): ab&#39;
console.log(&#39;(20, 2): &#39;  + str.substr(20, 2));  // &#39;(20, 2): &#39;</code></pre>
<blockquote>
<p>需要注意的是，Microsoft的JScript不支持起始索引的负值。如果要使用此功能，可以使用以下兼容性代码来解决此错误：</p>
</blockquote>
<pre class="javascript"><code>// only run when the substr() function is broken
if (&#39;ab&#39;.substr(-1) != &#39;b&#39;) {
  /**
   *  Get the substring of a string
   *  @param  {integer}  start   where to start the substring
   *  @param  {integer}  length  how many characters to return
   *  @return {string}
   */
  String.prototype.substr = function(substr) {
    return function(start, length) {
      // call the original method
      return substr.call(this,
        // did we get a negative start, calculate how much it is from the beginning of the string
        // adjust the start parameter for negative value
        start &lt; 0 ? this.length + start : start,
        length)
    }
  }(String.prototype.substr);
}</code></pre>
<h3 id="三substring与substr的主要区别">三、substring()与substr()的主要区别</h3>
<p><code>substring()</code>方法的参数表示起始和结束索引，<code>substr()</code>方法的参数表示起始索引和要包含在生成的字符串中的字符的长度,示例如下：</p>
<pre class="javascript"><code>var text = &#39;Mozilla&#39;;
console.log(text.substring(2,5)); // =&gt; &quot;zil&quot;
console.log(text.substr(2,3)); // =&gt; &quot;zil&quot;</code></pre>
<h3 id="四slice">四、slice()</h3>
<p><code>slice()</code>方法返回一个索引和另一个索引之间的字符串，语法如下：</p>
<blockquote>
<p>str/array.slice(beginIndex[, endIndex])</p>
</blockquote>
<p>下面有三点需要注意：</p>
<blockquote>
<ul>
<li>若<code>beginIndex</code>为负数,则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）。</li>
<li>如果<code>beginIndex</code>大于或等于字符串的长度，则<code>slice()</code>返回一个空字符串。</li>
<li>如果<code>endIndex</code>省略，则将<code>slice()</code>字符提取到字符串的末尾。如果为负，它被视为<code>strLength + endIndex</code>其中<code>strLength</code>是字符串的长度。</li>
</ul>
</blockquote>
<p>以下是一些示例代码：</p>
<pre class="javascript"><code>var str = &#39;abcdefghij&#39;;
console.log(&#39;(1, 2): &#39;   + str.slice(1, 2));   // &#39;(1, 2): b&#39;
console.log(&#39;(-3, 2): &#39;  + str.slice(-3, 2));  // &#39;(-3, 2): &#39;
console.log(&#39;(-3, 9): &#39;  + str.slice(-3, 9));  // &#39;(-3, 9): hi&#39;
console.log(&#39;(-3): &#39;     + str.slice(-3));     // &#39;(-3): hij&#39;
console.log(&#39;(-3，-1): &#39; + str.slice(-3，-1));     // &#39;(-3，-1): hi&#39;
console.log(&#39;(0，-1): &#39;  + str.slice(0，-1));     // &#39;(0，-1): abcdefghi&#39;
console.log(&#39;(1): &#39;      + str.slice(1));      // &#39;(1): bcdefghij&#39;
console.log(&#39;(-20, 2): &#39; + str.slice(-20, 2)); // &#39;(-20, 2): ab&#39;
console.log(&#39;(20): &#39;     + str.slice(20));  // &#39;(20): &#39;
console.log(&#39;(20, 2): &#39;  + str.slice(20, 2));  // &#39;(20, 2): &#39;</code></pre>