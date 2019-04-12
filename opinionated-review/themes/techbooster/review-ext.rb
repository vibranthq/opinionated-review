module ReVIEW
  module CompilerOverride
    def text(str) # `〜` をcodeタグ化する
      super(
        str.gsub(/\`(.+?)\`/, '@<code>$\1$')
      )
    end
  end

  class Compiler
    prepend CompilerOverride
  end
end
